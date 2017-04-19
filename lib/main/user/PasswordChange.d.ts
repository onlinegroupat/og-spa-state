import { PromisedValue } from "../PromisedValue";
import { BaseStore } from "../BaseStore";
export declare namespace PasswordChange {
    const Valid = "";
    interface Props {
        userId: number;
        oldPassword: string;
        newPassword: string;
        newPasswordConfirmation: string;
    }
    interface State {
        changePasswordState: PromisedValue<void>;
    }
    interface Service {
        /**
         * Creates a new session with the specified credentials
         * @param userId The user id
         * @param oldPassword The users old password
         * @param newPassword The users new password
         * @returns Promise that fulfills if the operation is successful
         */
        changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void>;
    }
    class Store extends BaseStore<PasswordChange.Props, PasswordChange.State> {
        private service;
        constructor(service: Service);
        readonly userId: number;
        readonly oldPassword: string;
        readonly newPassword: string;
        readonly newPasswordConfirmation: string;
        readonly changePasswordState: PromisedValue<void>;
        /**
         * Returns a message indicating why the new password is not valid,
         * or an empty string if the password is valid
         * @returns {string} password validity message
         */
        readonly newPasswordConfirmationValidity: string;
        execute(): Promise<void>;
        reset(): void;
        private resetProps();
    }
}
