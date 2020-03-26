import {autorun, observable, reaction} from "mobx";
import {ObjectBackedStore, SimpleStore, StoreBase} from "../main";

describe('Store', () => {
    test('fromProps', () => {

        interface Dog {
            name:string;
            foo?:number;
            unused?:Date;
        }

        let dog = SimpleStore.fromProps<Dog>({
            name:'Good boy',
            foo:undefined // required to track changes to `foo`
        });
        console.log("dog", dog);

        // react to change on dog and write them to updatedDog
        let updatedDog:Dog = { name:'' };

        autorun(() => console.log("dog name", dog.name));
        reaction(() => dog.name, name => {
            console.log("name changed");
            updatedDog.name = name
        });
        reaction(() => dog.foo, foo => updatedDog.foo = foo);

        // change properties on dog
        dog.setProps({
            name: 'Bad boy',
            foo:9000
        });

        // Direct readonly access should work on store
        expect(dog.name).toBe('Bad boy');
        expect(dog.foo).toBe(9000);

        // updatedDog should reflect our changes
        expect(updatedDog.name).toBe('Bad boy');
        expect(updatedDog.foo).toBe(9000);

        // this should not compile:
        // dog.name = 'test';
    });

    test('subclass', () => {

        interface MyProps {
            foo:string;
            bar:string;
        }

        interface MyState {
            state:string;
        }

        class MyStore extends StoreBase<MyProps, MyState> implements Readonly<MyProps & MyState> {

            @observable
            readonly foo:string;

            @observable
            readonly bar:string;

            @observable
            readonly state:string;

            updateState(value:string) {
                this.setState({state: value});
            }
        }

        let myState = new MyStore();

        // should not compile
        // myState.foo = 'test';

        myState.setProps({'foo': 'baz'});

        expect(myState.foo).toBe('baz');

        myState.updateState('baz');
        expect(myState.state).toBe('baz');
    });

    test('backingObject', () => {

        const obj = {
            foo:'bar',
        };

        const store = SimpleStore.backedBy(obj);

        store.setProps({foo: 'x'});

        expect(obj.foo).toBe('x');
    });

});

