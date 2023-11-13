import { FormGroup } from "@angular/forms";

export class Utility{
    static resetForm(form: FormGroup){
        form.reset();
        let controls=form.controls;
        Object.keys(controls).forEach((key) => {
            const control = controls[key];
            control.markAsUntouched();
            control.markAsPristine();
        });
    }
}