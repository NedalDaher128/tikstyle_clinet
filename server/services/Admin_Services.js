const mongoose = require("mongoose");
const DBURl = require("../module/UrlEncrypted");
const DBADMIN = require("../module/Admin")
const DBPRODUCT = require("../module/Product")
const DBUSER = require("../module/Account")
const DBCOUPON = require("../module/Coupon")
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const randomstring = require("randomstring");
const {uploadImage , deleteImage, updateImage} = require("../config/Firbase");
require("dotenv").config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
let linkimage ;
// Access to the secured encryption code
const encryption = process.env.TOKEN_SECRET;

// Access to the secured encryption code
const slugify = require('slugify');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mrgames7700@gmail.com', // استبدلها بعنوان البريد الإلكتروني الخاص بك
        pass: 'moyhoeenrrnqbxup', // استبدلها بكلمة المرور أو كلمة مرور التطبيق الخاصة بك
    },
});
const hashedText = async (text) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedText = (await bcrypt.hash(text, salt)).replace(/\./g, '-').replace(/\//g, '_');
        return hashedText;
    } catch (error) {
        throw error;
    }
};

const NewToken = (id) => {
    return jwt.sign({ id }, encryption, {
        expiresIn: 1 * 24 * 60 * 60
    })
}
// function customBtoa(input) {
//     const base64 = btoa(input);
//     return base64.replace(/\./g, '-').replace(/\//g, '_');
// }


module.exports.URLEcn = async (req, res) => {
    const { url } = req.body;
    console.log(url);
    try {
        const newUrlAdmin = await new DBURl({
            url
        });
        await newUrlAdmin.save();
        res.status(201).json({ message: "New URL DashBordAdmin" });
    } catch (error) {
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
};
module.exports.Automatic_update_URL = async () => {
    const time = 1 * 24 * 60 * 60
    const updatavalue = "/dashbord/admin"
    setInterval(async () => {
        try {
            const document = await DBURl.findOne({});
            if (document) {
                const hashedValue = await hashedText(updatavalue)
                await DBURl.updateOne({}, { url: hashedValue });
                // const mailOptions = {
                //     from: 'mrgames7700@gmail.com',
                //     to: 'maynkraftalhosni@gmail.com', // استبدلها بعنوان البريد الإلكتروني للمستلم
                //     subject: 'موضوع البريد الإلكتروني',
                //     text: ` the Link http://localhost:5173/admin/${hashedValue}`,
                // };
                // transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //         console.error('خطأ في إرسال البريد الإلكتروني: ', error);
                //     } else {
                //         console.log('تم إرسال البريد الإلكتروني بنجاح: ', info.response);
                //     }
                // });
            }
        } catch (error) {
            console.error('حدث خطأ:', error);
        }
    }, time)

};

module.exports.add_admin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // قم بإجراء التحقق من صحة البريد الإلكتروني وكلمة المرور هنا
        const CheckEmail = await DBADMIN.findOne({ email })

        if (CheckEmail) {
            res.status(403).json({ message: "This email has been used before" })
            return;
        }

        if (!CheckEmail) {
            const Account = new DBADMIN({
                email,
                password,
            });

            await Account.save();

            const newtoken = NewToken(Account._id);

            res.cookie("TokenAdmin", newtoken);
            res.status(201).json({
                message: "Welcome back, admin. Are you ready to work?",
                token: newtoken,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Contact the developer quickly" });
    }
};

module.exports.login_admin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // التحقق من صحة البريد الإلكتروني وكلمة المرور هنا
        const login = await DBADMIN.login(email, password);
        if (!login) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = NewToken(login._id);
        res.cookie("TokenAdmin", token, { expiresIn: 1 * 24 * 60 * 60 });
        res.status(201).json({ message: "Welcome back, admin to start logging in", token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error. Contact the developer" });
    }
};

// Check the token. Is it a valid token for the admin only?
module.exports.check_token = async (req, res) => {
    // barer token
    const barerToken = req.headers.authorization;
    if (!barerToken) {
        res.status(403).json({ message: "You are not authorized to access this page" })
        return;
    } else {
        const token = barerToken.split(" ")[1];
        try {
            const decoded = jwt.verify(token, encryption);
            const admin = await DBADMIN.findById(decoded.id);
            if (!admin) {
                res.status(403).json({ message: "You are not authorized to access this page" })
                return;
            } else {
                res.status(200).json({ message: "Welcome back, admin to start logging in" })
                return;
            }
        } catch (error) {
            res.status(403).json({ message: "You are not authorized to access this page" })
            return;
        }
    }
}

// refresh token
module.exports.refresh_token = async (req, res) => {
    const barerToken = req.headers.authorization;
    if (!barerToken) {
        res.status(403).json({ message: "You are not authorized to access this page" })
        return;
    } else {
        const token = barerToken.split(" ")[1];
        try {
            const decoded = jwt.verify(token, encryption);
            const admin = await DBADMIN.findById(decoded.id);
            if (!admin) {
                res.status(403).json({ message: "You are not authorized to access this page" })
                return;
            } else {
                const newtoken = NewToken(admin._id);
                res.cookie("TokenAdmin", newtoken, { expiresIn: 1 * 24 * 60 * 60 });
                res.status(201).json({ message: "Welcome back, admin to start logging in", token: newtoken });
                return;
            }
        } catch (error) {
            res.status(403).json({ message: "You are not authorized to access this page" })
            return;
        }
    }
}

module.exports.add_product = async (req, res) => {
    try {
        const files = req.files; // The array of files
        const filenames = []; // To store the uploaded image URLs
        console.log(req.files.length);
        
        for (const file of files) { // Use a different variable name for the current file
            // Upload the current file using uploadImage
            const response = await uploadImage(file);
            console.log(response);

            if (response) {
                filenames.push(response); // Store the image URL
            }
        }
        const { name, price, type, Category, quantity, images, Description,size } = req.body;
        const filename = JSON.parse(Description).map((item, index) => {
            return {
                linkimage: `${filenames[index].linkimage}`,
                color: item.color
            }
        });
        console.log(filenames)

        const newProduct = await new DBPRODUCT({
            name,
            quantity,
            price,
            Category,
            type,
            images: filename,
            mainImage: filename[0], // Use 'files' for the first file
            size,

        });

        await newProduct.save();
        res.status(201).json({ message: "New Product" });
    } catch (error) {
        console.error(error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.get_product = async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            const product = await DBPRODUCT.findById({ _id });
            res.status(200).json({ product });
        } else {
            const product = await DBPRODUCT.find({});
            res.status(200).json({ product });
        };

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
};

module.exports.remove_product = async (req, res) => {
    try {
      const { id } = req.params;
      const productdata = await DBPRODUCT.findById({ _id: id });
      console.log(productdata)
      // Delete all images in the 'images' array
      const deletedImages = await Promise.all(
        productdata.images.map(async (item) => {
          return await deleteImage(item.filename);
        })
      );
      // Check if all images were deleted successfully
      if ( deletedImages.every((fileName) => fileName !== null)) {
        const product = await DBPRODUCT.findByIdAndDelete(id);
        res.status(200).json({ product });
      } else {
        res.status(400).json({ message: "Failed to delete some or all of the images." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
  }

module.exports.update_product = async (req, res) => {
    try {
      const { id, name, price, quantity, Category, type, images } = req.body;
      const product = await DBPRODUCT.findById({ _id: id });
      if (product) {
        const updatedImagePromises = images.map((image) => {
          const { file, color } = image;
          return updateImage(file, color);
        });
        const updatedImageResults = await Promise.all(updatedImagePromises);
        
        const update = await DBPRODUCT.findOneAndUpdate({ _id: id }, {
          name,
          price,
          quantity,
          Category,
          type,
          images: updatedImageResults, // Update the images array with the updated URLs and colors
        });
  
        res.status(200).json({ update });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
};

module.exports.update_images = async (req, res) => {
    try {
      const { id } = req.params;
      const { destination } = req.body;
      const Description = JSON.parse(destination);
      const updatedImagePromises = req.files.map((file, index) => {
        const image = Description[index];
        return updateImage(file, image.color);
      });
      const updatedImageResults = await Promise.all(updatedImagePromises);
  
      const product = await DBPRODUCT.findById({ _id: id });
      if (product) {
        const update = await DBPRODUCT.findOneAndUpdate({ _id: id }, {
          images: updatedImageResults, // Update the images array with the updated URLs and colors
          mainImage: updatedImageResults[0],
        });
  
        res.status(200).json({ update });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
  }
  
module.exports.get_users = async (req, res) => {
    try {
        const users = await DBUSER.find({});
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
}

module.exports.remove_user = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await DBUSER.findByIdAndDelete({ _id: id });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
}

module.exports.update_user = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, username } = req.body;
        const user = await DBUSER.findById({ _id: id });
        if (user) {
            const update = await DBUSER.findOneAndUpdate({ _id: id }, {
                name,
                email,
                password,
                username
            });
            res.status(200).json({ update });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
}
module.exports.add_coupon = async (req, res) => {
    try {
        const { coupon, rate } = req.body;
        const newCoupon = await new DBCOUPON({
            coupon,
            rate
        });
        await newCoupon.save();
        res.status(201).json({ message: "New Coupon" });
    } catch (error) {

    }
}
module.exports.get_coupon = async (req, res) => {
    try {
        const { rate } = req.body;
        const coupondata = await DBCOUPON.find({});
        if (coupondata && coupondata.length > 0) {
            res.status(200).json({ message: "get coupon",coupondata });
            return;
        } else {
            for (let i = 0; i < 100; i++) {
                console.log(i);
                const newCoupon = await new DBCOUPON({
                    coupon: randomstring.generate(7),
                    rate: "3"
                });
                await newCoupon.save();
                if (i === 99) { // تم تحديث الشرط هنا
                    res.status(201).json({ message: "New Coupon" });
                    return;
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
}
module.exports.update_coupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { discount } = req.body;
        const coupondata = await DBCOUPON.findById({ _id: id });
        if (coupondata) {
            const update = await DBCOUPON.findOneAndUpdate({ _id: id }, {
                rate :`${discount}` 
            });
            res.status(200).json({ update });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "There is an error accessing the admin page. Please contact the developer as soon as possible" });
    }
}
    