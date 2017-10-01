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

function getRef( obj, pathArray ) {
    let value = obj[ pathArray[ 0 ] ];
    for ( let i = 1; i < pathArray.length; i++ ) {
        if ( value ) {
            value = value[ pathArray[ i ] ];
        } else {
            return value;
        }
    }
    return value;
}

function isFormValid( form, allProps ) {
    let isFormValid = true;
    for ( let i = 0; i < allProps.length; i++ ) {
        const isPropValid = form[ allProps[ i ] ] ? form[ allProps[ i ] ].error === null : false;
        isFormValid = isFormValid && isPropValid;
    }
    return isFormValid;
};

/**
 * @param {any} form - the form from the Component or the innerForm from an object property of that form
 * @param {any} schema - the form/inner object property schema
 * @param {any} prop - the string name of the property (the key)
 * @param {any} allProps  array with all properties of a form (the root form or the inner object)
 * @param {any} dataObj - the actual data - this when callled for the root for or the corresponding key of a root property of this
 * @param {any} pathArray - the path to a value relative from the dataObj
 */
function validateForm( form, schema, prop, allProps, dataObj, pathArray ) {
    let isValid = true;
    switch ( schema.type ) {
        case 'boolean':
            isValid = validators.boolean( getRef( dataObj, pathArray ), schema );
            break;
        case 'number':
            isValid = validators.number( getRef( dataObj, pathArray ), schema );
            break;
        case 'string':
            isValid = validators.string( getRef( dataObj, pathArray ), schema );
            break;
        case 'object':

            break;
    }
    form[ prop ] = {};
    form[ prop ].error = isValid ? null : { message: schema.message };
    form.isValid = isFormValid.bind( this )( form, allProps );
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
            const form = this.formErrors[ formName ] = {};
            form.isValid = false;
            for ( let prop in this.forms[ i ].schema ) {
                const schema = this.forms[ i ].schema[ prop ].schema;

                const propValidator = validateForm.bind( this, form, schema, prop, allProps, this, [ prop ] );

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
            Vue.prototype.$$hasError = function ( pathArray ) {
                return getRef( this.formErrors, pathArray.push( 'error' ) );
            };
            Vue.prototype.$$getError = function ( pathArray ) {
                return getRef( this.formErrors, pathArray ).error.message;
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
