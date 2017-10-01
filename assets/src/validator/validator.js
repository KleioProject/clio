const validators = {
    boolean: function ( prop, schema ) {
        return typeof prop === 'boolean' && prop === schema.value;
    },
    number: function ( prop, schema ) {
        if ( isNaN( prop ) ) {
            return false;
        }
        if ( typeof schema.min === 'number' && prop < schema.min ) {
            return false;
        }
        if ( typeof schema.max === 'number' && prop > schema.max ) {
            return false;
        }
        return true;
    },
    string: function ( prop, schema ) {
        if ( typeof prop !== 'string' ) {
            return false;
        }
        if ( typeof schema.min === 'number' && prop.length < schema.min ) {
            return false;
        }
        if ( typeof schema.max === 'number' && prop.length > schema.max ) {
            return false;
        }
        if ( schema.regExp && !( new RegExp( schema.regExp ).test( prop ) ) ) {
            return false;
        }
        return true;
    }
}

function isFormValid( formName, allProps ) {
    let isFormValid = true;
    for ( let i = 0; i < allProps.length; i++ ) {
        const isPropValid = this.formErrors[ formName ][ allProps[ i ] ] === null;
        isFormValid = isFormValid && isPropValid;
    }
    return isFormValid;
};

function validateForm( formName, schema, prop, allProps ) {
    if ( !this.formErrors[ formName ] ) {
        this.formErrors[ formName ] = {};
        this.formErrors[ formName ].isValid = false;
    }
    let isValid = true;
    switch ( schema.type ) {
        case 'boolean':
            isValid = validators.boolean( this[ prop ], schema );
            break;
        case 'number':
            isValid = validators.number( this[ prop ], schema );
            break;
        case 'string':
            isValid = validators.string( this[ prop ], schema );
            break;
        case 'object':

            break;
    }
    this.formErrors[ formName ][ prop ] = isValid ? null : { message: schema.message };
    this.formErrors[ formName ].isValid = isFormValid.bind( this )( formName, allProps );
}

function createFormValidatorsFactory( Vue ) {
    return function createFormValidators() {
        if ( !( this instanceof Vue ) ) {
            throw new Error( 'Validator Error: Validator can be set only on a Vue instance.' );
            return;
        }
        if ( !this.forms || !Array.isArray( this.forms ) ) {
            return;
        }
        this.formErrors = {};
        this.$$validateAllFields = {};
        for ( let i = 0; i < this.forms.length; i++ ) {
            const formName = this.forms[ i ].name;
            const allPropsValidators = [];
            const allProps = Object.keys( this.forms[ i ].schema );
            for ( let prop in this.forms[ i ].schema ) {
                const schema = this.forms[ i ].schema[ prop ].schema;
                // const form = this.formErrors[ formName ] = {};
                const propValidator = validateForm.bind( this, formName, schema, prop, allProps );
                allPropsValidators.push( propValidator );
                this.$watch( prop, propValidator );
            }
            allPropsValidators.push( this.$forceUpdate.bind( this ) );
            this.$$validateAllFields[ formName ] = function () {
                allPropsValidators.forEach( function ( validator ) {
                    validator();
                } );
            };
        }
    }
};

export default function createValidator() {
    return {
        install( Vue, options ) {
            Vue.prototype.$$validator = createFormValidatorsFactory( Vue );
            Vue.prototype.$$hasError = function ( formName, propName ) {
                return this.formErrors && this.formErrors[ formName ] && this.formErrors[ formName ][ propName ];
            };
            Vue.prototype.$$getError = function ( formName, propName ) {
                if ( !this.formErrors ) {
                    return;
                }
                return this.formErrors[ formName ][ propName ].message;
            };
            Vue.prototype.$$isValidForm = function ( formName ) {
                return this.formErrors && this.formErrors[ formName ] && this.formErrors[ formName ].isValid;
            };
            Vue.mixin( {
               created() {
                    this.$$validator();
                }
            } );
        }
    }
};
