const User = require("../models/userModel");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const catchAsyncError = require("../middleware/catchAsyncError");
const setToken = require("../utils/setJwtToken");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  // console.log(req.body);
  const { name, email, password, avatar } = req.body;
  var secure_url = process.env.DEFAULT_PROFILE_URL;
  var public_id = process.env.DEFAULT_PROFILE_ID;
  if (avatar !== "") {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "notes_user_avatar",
    });
    secure_url = myCloud.secure_url;
    public_id = myCloud.public_id;
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id,
      url: secure_url,
    },
  });
  try {
    const message = `Welcome ${name},\nYou are now registered and welcome to the NotesApp.\n\nThanks,\nAdmin`;
    await sendEmail({ email: email, subject: "NotesApp - Welcome", message });
  } catch (error) {
    console.log(`Welcome email not sent to the ${email}`);
  }
  setToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  setToken(user, 200, res);
});

// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password -tokens");
  if (!user) {
    return next(new ErrorHandler("No details found.", 404));
  }
  res.status(200).json({ success: true, user });
});

// update user profile
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
  };

  if (req.body.avatar !== "") {
    const imageId = req.user.avatar.public_id;
    if (imageId === process.env.DEFAULT_PROFILE_ID) {
      let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "notes_user_avatar",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      await cloudinary.v2.uploader.destroy(imageId);

      let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "notes_user_avatar",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully", user });
});

// delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const imageId = req.user.avatar.public_id;
  if (imageId !== process.env.DEFAULT_PROFILE_ID) {
    await cloudinary.v2.uploader.destroy(imageId);
  }

  try {
    const message = `Bye ${req.user.name},\nSorry to see that you are leaving us.\n\nThanks,\nAdmin`;
    await sendEmail({
      email: req.user.email,
      subject: "NotesApp - Bye",
      message,
    });
  } catch (error) {
    console.log(`User deletion email not sent to the ${req.user.email}`);
  }
  await req.user.remove();
  res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
});

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Hi, \nYour password reset url is: ${resetPasswordUrl}\n\n If you have not requested for this then please ignore the mail. Your account is safe with us.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "NotesApp - Password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler("Something went wrong. Email is not sent.", 500)
    );
  }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or expire", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});
