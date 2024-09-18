declare module 'sg-form-lib' {
  export interface FormProps {
    formId?: string;
    fieldsConfig: object;
    title: string;
    subtitle?: string | null;
    btnText: string;
    onSubmitFunction: (e) => void;
    errorMessage: string | null;
    fieldNames: string[];
    fieldValue?: T;
  }
  export const Form: React.FC<FormProps>;
}
