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
                        max: 10,
                        min: 2,
                        message: 'Имейлът трябва да е между 2 и 10 символа.'
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
                        max: 10,
                        min: 4,
                        message: 'Паролата трябва да бъде между 4 и 10 символа.'
                    }
                },
                regPasswordRepeat: {
                    schema: {
                        type: 'string',
                        max: 10,
                        min: 4,
                        message: 'Паролата трябва да бъде между 4 и 10 символа.'
                    }
                },
                regPhone: {
                    schema: {
                        type: 'string',
                        max: 10,
                        min: 10,
                        message: 'Въведете валиден телефонен номер.'
                    }
                }
            }
        }
    ]
};
