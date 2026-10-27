import type { FormEvent } from 'react'

export type ProductDetailTab = 'overview' | 'specifications' | 'reviews' | 'questions'
export type ProductQuestionSubmitEvent = FormEvent<HTMLFormElement>
