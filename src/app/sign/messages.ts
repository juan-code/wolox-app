import { AbstractControl } from "@angular/forms";

const ROOT:string = 'SIGN_UP';
const PATH_TRANSLATE:any = {
  name: {
    path: 'MESSAGES_ERROR_NAME',
    validations: {
      required: 'REQUIRED',
      maxlength: 'MAX_LENGHT',
    }
  },
  last_name: {
    path: 'MESSAGES_ERROR_LAST_NAME',
    validations: {
      required: 'REQUIRED',
      maxlength: 'MAX_LENGHT',
    }
  },
  country: {
    path: 'MESSAGES_ERROR_COUNTRY',
    validations: {
      required: 'REQUIRED',
    }
  },
  email: {
    path: 'MESSAGES_ERROR_EMAIL',
    validations: {
      required: 'REQUIRED',
      pattern: 'PATTERN'
    }
  },
  phone: {
    path: 'MESSAGES_ERROR_PHONE',
    validations: {
      required: 'REQUIRED',
      pattern: "PATTERN",
      maxlength: "MAX"
    }
  },
  password: {
    path: 'MESSAGES_ERROR_PASSWORD',
    validations: {
      required: 'REQUIRED',
    }
  },
  confirmation: {
    path: 'MESSAGES_ERROR_CONFIRMATION',
    validations: {
      required: 'REQUIRED',
      match: 'MATCH',
    }
  },
};

export const MESSAGES:any = (() => {
  const translantionPaths:any = {};
  const keysTransalition = Object.keys(PATH_TRANSLATE);
  for(let key of keysTransalition) {
    const validations = PATH_TRANSLATE[key].validations;
    translantionPaths[key] = {}
    for(let validation in validations) {
      translantionPaths[key][validation] = getPath(key, validation)
    }
  }
  return translantionPaths
})();

export function getPath(pathName:string, validation:string):string {
  return `${ROOT}.${PATH_TRANSLATE[pathName].path}.${PATH_TRANSLATE[pathName].validations[validation]}`
}

export function getMessage(key:string, control:AbstractControl | null): string {
  const path = MESSAGES[key];
  for(let errorMessageKey in path) {
    const hasError = control?.hasError(errorMessageKey) || false;
    if(hasError) {
      return path[errorMessageKey]
    }
  }
  return ''
}
