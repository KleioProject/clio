const validators = {
    boolean: function ( prop, schema ) {
        return typeof prop === 'boolean' && prop === schema.value;
    },
    number: function ( prop, schema ) {
        if ( isNaN(prop) ) {
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

export default function ( Vue ) {
    return function createFormValidators() {
        if ( !( this instanceof Vue ) ) {
            throw new Error( 'Validator Error: Validator can be set only on a Vue instance.' );
        }
        if ( !this.forms || !Array.isArray( this.forms ) ) {
            throw new Error( 'Validator Error: No "forms" Array provided to the data function.' );
        }
        if ( this.formErrors === undefined ) {
            throw new Error( `Validator Error: The data formErrors property is ${ this.formErrors }.` );
        }
        this.validateForm = {};
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
            this.validateForm[ formName ] = function () {
                allPropsValidators.forEach( function ( validator ) {
                    validator();
                } );
            };
        }
    }
};
