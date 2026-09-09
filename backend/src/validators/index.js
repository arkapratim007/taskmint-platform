import { body} from "express-validator";

const userRegisterValidator = ()=>{
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength()
            .withMessage("Username must be at least 3 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullName").optional().trim(),      
    ];
};

const userLoginValidator = ()=>{
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("password is required"),
    ]
}

export {
    userRegisterValidator,userLoginValidator };