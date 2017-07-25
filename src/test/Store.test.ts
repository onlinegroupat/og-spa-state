import {reaction} from "mobx";
import {ObjectBackedStore, SimpleStore, StoreBase} from "../main/Store";

describe('Store', () => {
    test('createFrom', () => {

        interface Dog {
            name:string;
            foo?:number;
            unused?:Date;
        }

        let dog = SimpleStore.fromProps<Dog>({
            name:'Good boy',
            foo:undefined // required to track changes to `foo`
        });

        // react to change on dog and write them to updatedDog
        let updatedDog:Dog = { name:'' };
        reaction(() => dog.name, name => updatedDog.name = name);
        reaction(() => dog.foo, foo => updatedDog.foo = foo);

        // change properties on dog
        dog.setProps({
            name: 'Bad boy',
            foo:9000
        });

        // updatedDog should reflect our changes
        expect(updatedDog.name).toBe('Bad boy');
        expect(updatedDog.foo).toBe(9000);

        // Direct readonly access should work on store
        expect(dog.name).toBe('Bad boy');

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
            readonly foo:string;
            readonly bar:string;
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

        let props = {
            foo:'bar',
        };

        let state = {
            bar:'baz',
        };

        let backingObject = Object.assign({}, props, state);

        let myState = SimpleStore.backedBy(backingObject);

        myState.setProps({'foo': 'x'});

        expect(backingObject.foo).toBe('x');
    });

    test('subclass with backingObject', () => {

        interface MyProps {
            foo:string;
            bar:string;
        }

        interface MyState {
            state:string;
        }

        class MyStore extends StoreBase<MyProps, MyState>  {

            public myBackingObject = {
                foo:'x',
                bar:'y',
                state:'z'
            };

            get backingObject() {
                return this.myBackingObject;
            }

            updateState(value:string) {
                this.setState({state: value});
            }
        }

        let myState = new MyStore();

        myState.setProps({'foo': 'baz'});
        expect(myState.myBackingObject.foo).toBe('baz');

        myState.updateState('baz');
        expect(myState.myBackingObject.state).toBe('baz');
    })
});

