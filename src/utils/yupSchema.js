import * as yup from 'yup';

const userSchema = yup.object().shape({
    username: yup.string().min(4,'Too short!. Should be 4 or more characters.').max(50,'Too long!. Max is 50 characters').required('Required!'),
    password: yup.string().min(4,'Too short!. Should be 4 or more characters.').max(50,'Too long!. Max is 50 characters').required('Required!')
})

export {
    userSchema
}