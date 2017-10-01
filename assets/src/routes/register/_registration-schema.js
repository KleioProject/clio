export default () => {
    return [
        {
            name: 'register',
            schema: {
                testArray: {
                    schema: {
                        type: 'array',
                        min: 1,
                        max: 1,
                        message: 'Array is needed',
                        schema: {
                            item: {
                                type: 'string',
                                message: 'Трябва да съм до 2 символа',
                                max: 2
                            }
                        }
                    }
                },
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
                        message: 'За да регистрирате потребител, трябва да сте съгласни с правилата за ползване на сайта.'
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
                }
            }
        }
    ]
};
