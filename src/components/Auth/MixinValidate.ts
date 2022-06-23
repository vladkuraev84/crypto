import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";

Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

// defineRule("deleteDot", (value) => {
//     const lastElement = value.slice(-1);
//     if (lastElement === '.') {
//         value.substing(0, value.length - 1)
//     }

//     return true;
// });

defineRule("requiredConfirm", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return "Confirmation is not valid";
    }
    return true;
});

defineRule("passwordReq", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return "Password is not valid";
    }
    return true;
});

defineRule("emailReq", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return "Email is not valid";
    }
    // Check if email
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        return "This field must be a valid email";
    }
    return true;
});

defineRule("maxLength", (value, [limit]) => {
    if (value.length > limit) {
        return `This field must be no more than ${limit} characters`;
    }
    return true;
});

defineRule("minLength", (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }
    if (value.length < limit) {
        return `This field must be at least ${limit} characters`;
    }
    return true;
});

defineRule("verify_password", (value) => {
    const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+=_()?!@#$%^&*.,])(?=.{8,30})"
    );
    if (!strongRegex.test(value) || value.indexOf(" ") > -1) {
        return `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`;
    }
    return strongRegex.test(value);
});

defineRule("_password_uppercaseL", (value) => {
    const strongRegex = new RegExp(
        "^(?=.*[A-Z])"
    );
    if (!strongRegex.test(value) && value.length > 0) {
        return `The password must contain at least: 1 uppercase letter`;
    }
    return strongRegex.test(value);
});

defineRule("_password_lowercaseL", (value) => {
    const strongRegex = new RegExp(
        "^(?=.*[a-z])"
    );
    if (!strongRegex.test(value) && value.length > 0) {
        return `The password must contain at least: 1 lowercase letter`;
    }
    return strongRegex.test(value);
});

defineRule("_password_number", (value) => {
    const strongRegex = new RegExp(
        "^(?=.*[0-9])"
    );
    if (!strongRegex.test(value) && value.length > 0) {
        return `The password must contain at least: 1 number`;
    }
    return strongRegex.test(value);
});

defineRule("_password_specCharacter", (value) => {
    const strongRegex = new RegExp(
        "^(?=.*[-+=_()?!@#$%^&*.,])"
    );
    if (!strongRegex.test(value) && value.length > 0) {
        return `The password must contain at least: 1 special character (E.g. , . _ & ? etc)`;
    }
    return strongRegex.test(value);
});
defineRule("verify_password_spaces", (value) => {
    if (value.indexOf(" ") > -1) {
        return `Password cannot have spaces`;
    }
    return true;
});


defineRule("_password_latin", (value) => {
    const strongRegex = new RegExp(
        "^[A-Za-z0-9\\s!@#$%^&*()_+=-`~\\\\\\]\\[{}|';:\\.,?><]*$"
    );
    if (!strongRegex.test(value) && value.length > 0) {
        return `The password must contain only latin characters`;
    }
    return strongRegex.test(value);
});

defineRule("confirmed", (value, [target]: "password", ctx) => {
    if (value === ctx.form[target]) {
        return true;
    }
    return "Passwords must match";
});

export default class MixinValidate { }
