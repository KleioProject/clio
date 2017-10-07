import { EMAIL, PASSWORD, PHONE } from '../../validator/reg-exps';

export default () => {
    return [
        {
            name: 'register',
            schema: {
                passwordsAreEqual: {
                    schema: {
                        type: 'boolean',
                        value: true,
                        message: 'Паролите не съвпадат.'
                    }
                },
                regAgree: {
                    schema: {
                        type: 'boolean',
                        value: true,
                        message: 'Преди да се регистрирате, трябва да сте съгласни с правилата за ползване на сайта.'
                    }
                },
                regEmail: {
                    schema: {
                        type: 'string',
                        regExp: EMAIL,
                        message: 'Въведете валиден имейл адрес.'
                    }
                },
                regFaculty: {
                    schema: {
                        type: 'object',
                        message: 'Изборът на факултет е задължителен',
                        schema: {
                            id: {
                                type: 'string',
                                min: 1,
                                message: 'Факултетът трябва да има id',
                            },
                            label: {
                                type: 'string',
                                min: 1,
                                message: 'Факултетът трябва да има label',
                            }
                        }
                    }
                },
                regFacultyNumber: {
                    schema: {
                        type: 'string',
                        max: 256,
                        min: 1,
                        message: 'Това поле е задължително.'
                    }
                },
                regFirstName: {
                    schema: {
                        type: 'string',
                        max: 256,
                        min: 1,
                        message: 'Това поле е задължително.'
                    }
                },
                regLastName: {
                    schema: {
                        type: 'string',
                        max: 256,
                        min: 1,
                        message: 'Това поле е задължително.'
                    }
                },
                regPassword: {
                    schema: {
                        type: 'string',
                        regExp: PASSWORD,
                        message: 'Паролата трябва да бъде между 8 и 16 символа, да съдържа цифра, буква и специален символ.'
                    }
                },
                regPasswordRepeat: {
                    schema: {
                        type: 'string',
                        regExp: PASSWORD,
                        message: 'Паролата трябва да бъде между 8 и 16 символа, да съдържа цифра, буква и специален символ.'
                    }
                },
                regPhone: {
                    schema: {
                        type: 'string',
                        regExp: PHONE,
                        message: 'Въведете валиден телефонен номер.'
                    }
                }
            }
        }
    ]
};
