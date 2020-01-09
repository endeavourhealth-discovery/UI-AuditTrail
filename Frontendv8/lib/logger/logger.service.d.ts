import { MatSnackBar } from '@angular/material/snack-bar';
export declare class LoggerService {
    private snackBar;
    constructor(snackBar: MatSnackBar);
    info(message: string): void;
    success(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    trace(message: string): void;
}
