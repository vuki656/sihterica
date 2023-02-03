import type { FieldError } from 'react-hook-form'

import type { ExtractFormFieldErrors } from './extractFormFieldError.types'

export function extractFormFieldError(fieldError: FieldError | undefined): ExtractFormFieldErrors {
    if (!fieldError) {
        return {
            error: '',
        }
    }

    return {
        error: fieldError.message,
    }
}
