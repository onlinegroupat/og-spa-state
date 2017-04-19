import {action, computed, observable} from "mobx";
import {PromisedValue} from "../PromisedValue";
import {BaseStore} from "../BaseStore";

export namespace PasswordChange {

    export const Valid = '';

    export interface Props {
        userId:number;
        oldPassword:string;
        newPassword:string;
        newPasswordConfirmation:string;
    }

    export interface State {
        changePasswordState:PromisedValue<void>;
    }

    export interface Service {
        /**
         * Creates a new session with the specified credentials
         * @param userId The user id
         * @param oldPassword The users old password
         * @param newPassword The users new password
         * @returns Promise that fulfills if the operation is successful
         */
        changePassword(userId:number, oldPassword:string, newPassword:string):Promise<void>;
    }

    export class Store extends BaseStore<PasswordChange.Props, PasswordChange.State> implements Readonly<PasswordChange.Props> {

        constructor(private service:Service) {
            super();
        }

        @observable
        public readonly userId:number;

        @observable
        public readonly oldPassword:string;

        @observable
        public readonly newPassword:string;

        @observable
        public readonly newPasswordConfirmation:string;

        @observable
        public readonly changePasswordState:PromisedValue<void>;

        /**
         * Returns a message indicating why the new password is not valid,
         * or an empty string if the password is valid
         * @returns {string} password validity message
         */
        @computed
        public get newPasswordConfirmationValidity():string {
            return (this.newPassword != this.newPasswordConfirmation)
                ? 'Bestätigung stimmt nicht überein'
                : Valid;
        }

        @action
        public execute():Promise<void> {
            let validity = this.newPasswordConfirmationValidity;
            if (validity != Valid) {
                throw new Error(validity);
            }

            let promise = this.service.changePassword(this.userId, this.oldPassword, this.newPassword)
                .then(() => this.resetProps());

            this.setState({
                changePasswordState: new PromisedValue<void>(promise)
            });

            return promise;
        }

        @action
        public reset():void {
            this.resetProps();
            this.setState({
                changePasswordState:null
            });
        }

        private resetProps():void {
            this.setProps({
                oldPassword:'',
                newPassword:'',
                newPasswordConfirmation:''
            });
        }
    }
}
