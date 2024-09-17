declare module 'sg-form-lib' {
  export interface FormProps {
    formId?: string;
    fieldsConfig: object;
    title: string;
    btnText: string;
    onSubmitFunction: (e) => void;
    errorMessage: string | null;
    fieldNames: string[];
    fieldValue?: object;
  }
  export const Form: React.FC<FormProps>;
}
