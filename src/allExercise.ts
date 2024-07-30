// basic types
let username: string;
let age: number;
let active: boolean;
let nomeDePlume: any;

username = "protick";
age = 30;
active = true;

nomeDePlume = "lets say thanks you";
nomeDePlume = 12;

console.log(username, age, active, nomeDePlume, typeof nomeDePlume);

let numbers: number[];
numbers = [1, 2, 3, 4];
console.log(numbers);

// object type declaration
let user: {
  username: string;
  age: number;
  isActive: boolean;
  nomDePlume?: string; // optional object property
};

user = {
  username: "protick",
  age: 30,
  isActive: true,
};

// union type
type NomDePlume = string | number | boolean;

type UserType = {
  username: string;
  age: number;
  isActive: boolean;
  nomDePlume?: NomDePlume;
};

let userJohn: UserType;

userJohn = {
  username: "John",
  age: 21,
  isActive: true,
  nomDePlume: 101,
};
console.log(userJohn);

// array of different element types,
type MixedElementArray = (string | number | boolean)[];

let section: MixedElementArray;

section = ["Protick", 30, true, "lets say thank you"];
console.log(section);

// function
const greet = (user: UserType): string => {
  return `Hello ${user.username}`;
};

console.log(greet(userJohn));

// string literal type
// address pronouns
type AddressingPronouns = "Mr" | "Mrs" | "Ms";

const greetWithProperAddress = (
  user: UserType,
  address: AddressingPronouns
): string => {
  return `Hello ${address} ${user.username}`;
};

console.log(greetWithProperAddress(userJohn, "Mr"));

// enum
enum Status {
  ACTIVE = 1,
  INACTIVE = 10,
  REVIEW = 100,
  HIDDEN = 1000,
}

console.log(Status.HIDDEN);

// tuple
type MyTupleType = [string, number, boolean];
let elements: MyTupleType;
/* error
  elements = ["protick", true, 1]; 
  data type at index are fixed and all elements are required;
*/
// okay
elements = ["protick", 30, true];

// RegEx
let selectAllWord: RegExp = /\w+/g;
console.log(typeof selectAllWord);

// interface and type aliases can be extended however
// interface can be reopened to add new properties
// while type for an object can not be reopened

// interface extension
interface Student {
  name: string;
  semester: number;
  department: string;
}

// interface reopened to include "active" property
interface Student {
  active: boolean;
}

let soya: Student = {
  name: "Soya",
  semester: 1,
  department: "CS",
  active: true,
};
console.log(soya);

// type extension
type StudentType = {
  name: string;
  semester: number;
  department: string;
};

// you can not reopen type "StudentType" to add another property e.g., active in it
// but you can extend it however by creating a new type

type StudentTypeWithActive = StudentType & { active: boolean };

let kelly: StudentTypeWithActive;
kelly = {
  name: "Kelly",
  semester: 3,
  department: "BBA",
  active: true,
};

console.log(kelly);

// function type declaration using type alias
type MathFunctionType = {
  (param1: number, param2: number): number;
};

const add: MathFunctionType = (a: number, b: number): number => {
  return a + b;
};
console.log(add(1, 10));

// function type declaration using interface
interface MathFunction {
  (param1: number, ...nums: number[]): number;
}

const total: MathFunction = (a: number, ...rest: number[]): number => {
  return a + rest.reduce((prevTotal, num) => prevTotal + num, 0) || 0;
};

const grandTotal: ReturnType<typeof total> = total(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(grandTotal);

// never type
// if a function explicitly throws error or has an infinite loop inside then the return type becomes "never"
const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

const stringOrNumber = (value: string | number): string => {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";

  return createError("This should never happen");
};

// class
class Animal {
  public readonly name: string;
  private _age: number;
  protected _userId: number;
  protected isActive: boolean;
  static counter: number = 0;
  species!: string; // does not need an instantiator

  constructor(name: string, _age: number, isActive: boolean) {
    console.log(_age);
    this.name = name;
    this._age = _age;
    this.isActive = isActive;
    this._userId = ++Animal.counter;
  }

  public set age(year: number) {
    this._age = year;
  }

  public get age(): number {
    return this._age;
  }

  public get userId(): number {
    return this._userId;
  }
}

const ziraff = new Animal("Ziraff", 10, true);
console.log(ziraff.age);

// class with interface
interface Musician {
  instrument: string;
  play(action: string): string;
}

class Guitarist implements Musician {
  public name: string;
  public instrument: string;

  constructor(name: string, instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  play(action: string): string {
    return `${this.name} ${action} ${this.instrument}`;
  }
}

const protick = new Guitarist("protick", "Spanish guitar");
console.log(protick.play("strums"));

// string, number, boolean, any, array, object, union, tuple, RegEx, function, literal type, never type
// type alias, enum, interface, class,
// type assertion, index register, keyof, generics, utility

// keyof operator
interface TransactionObj {
  Pizza: number;
  Books: number;
  Job: number;
}

let transactions: TransactionObj = {
  Pizza: -10,
  Books: -30,
  Job: 50,
};

console.log(transactions["Books"]);
let key = "Pizza";

console.log(transactions[key as keyof TransactionObj]);

for (const key in transactions) {
  console.log(key, transactions[key as keyof TransactionObj]);
}

// alternatively
for (const key in transactions) {
  console.log(`${key}: ${transactions[key as keyof typeof transactions]}`);
}
/*** what keyof does is creates a union type of string literal ***/

// index register
interface TransactionObject {
  [index: string]: number | string | boolean;
  Pizza: number;
  Books: number;
  Job: number;
}

const transactionsToday: TransactionObject = {
  Pizza: 10,
  Books: 20,
  Job: 30,
  Flag: true,
};

transactionsToday.active = true;

console.log(transactionsToday["Flag"]);

// type literal and Record utility type instead of interface
type Streams = "salary" | "bonus" | "sideHustle";
type Incomes = Record<Streams, number>;

const userIncomes: Incomes = {
  salary: 10000,
  bonus: 4000,
  sideHustle: 1000,
};

for (const key in userIncomes) {
  console.log(`${key}: ${userIncomes[key as keyof Incomes]}`);
}

// alternatively,
for (const key in userIncomes) {
  console.log(`${key}: ${userIncomes[key as keyof typeof userIncomes]}`);
}

/* Generics */

// generic function expression style
const echo = <T>(arg: T): T => {
  // if it receives string, it returns string
  // if it receives number, it returns number
  //...
  return arg;
};

// generic function declaration style
function echoDec<T>(arg: T): T {
  return arg;
}

// use case 1: of generic function
const isObj = <T>(arg: T): boolean => {
  if (typeof arg === "object" && !Array.isArray(arg) && arg !== null) {
    return true;
  }
  return false;
};

// use case 2: of generic function
const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
  // if array and not empty
  if (Array.isArray(arg) && !arg.length) {
    return {
      arg,
      is: false,
    };
  }

  // if object and has at least 1 property
  // difficult to understand:
  // Object.keys(arg as keyof T)
  if (typeof arg === "object" && !Object.keys(arg as keyof T).length) {
    return {
      arg,
      is: false,
    };
  }

  return {
    arg,
    is: !!arg,
  };
};

// generic in a class
class StateObject<T> {
  private data: T;

  constructor(value: T) {
    this.data = value;
  }

  public get state(): T {
    return this.data;
  }

  public set state(value: T) {
    this.data = value;
  }
}

// implicit, inferred type definition of store1
const store1 = new StateObject(12);

// explicit type definition of store2
const store2 = new StateObject<string>("this is a string");
console.log(store2.state);

// complex call to StateObject
// const anotherState1 = new StateObject<(string | number | boolean)[]>([12]);
const anotherState2 = new StateObject<(string | number | boolean)[]>([
  "Protick",
  22,
  true,
]);

console.log(anotherState2);

// utility types
// 1. Partial: makes all properties optional
interface AssignmentCS {
  title: string;
  marks: number;
  isGraded: boolean;
  review?: boolean;
}

const updateAssignment = (
  assignment: AssignmentCS,
  propsToUpdate: Partial<AssignmentCS>
): AssignmentCS => {
  return { ...assignment, ...propsToUpdate };
};

const sarasAssignment: AssignmentCS = {
  title: "English assignment",
  marks: 100,
  isGraded: false,
};

const sarasAssignmentUpdated = updateAssignment(sarasAssignment, {
  isGraded: true,
  marks: 96,
});

console.log(sarasAssignmentUpdated);

// 2. Required: make all properties required even if ones that are
// declared optional in interface or type object

// 3. Readonly: make an object immutable
const kellyUpdatedAssignment: Readonly<AssignmentCS> = {
  title: "Math assignment",
  marks: 90,
  isGraded: true,
};

// error: Cannot assign to 'review' because it is a read-only property
// kellyUpdatedAssignment.review = true;

// 4. Record: <Record<ObjectKeyType, ObjectValueType>

/************************ works on interface or object **********************/
// 5. Pick:
type AssignmentResult = Pick<AssignmentCS, "title" | "marks">;
const saraResult: AssignmentResult = {
  title: "English literature",
  marks: 97,
};

// 6. Omit:
type AssignmentReview = Omit<AssignmentCS, "marks" | "isGraded">;
const saraAssignmentReview: AssignmentReview = {
  title: "English literature",
  review: true,
};

/************************ works on string literal union type **********************/
type LetterGradesCS = "A" | "B" | "C" | "D" | "U" | null | undefined;
// 7. Exclude:
type AdjustedGradesCS = Exclude<LetterGradesCS, "U" | null | undefined>;

// 8. Extract:
type HighGradesCS = Extract<LetterGradesCS, "A" | "B">;

// 9. NonNullable
type NotNullGrades = NonNullable<LetterGradesCS>;

// 10. ReturnType
const addTwoNumbers = (a: number, b: number) => {
  return a + b;
};

// infer return type of "addTwoNumbers"
type AddTwoNumberType = ReturnType<typeof addTwoNumbers>;

// using inferred return type of "addTwoNumbers"
const result: AddTwoNumberType = addTwoNumbers(10, 20);

// 11. Parameters
const makeTotal = (a: number, ...numbers: number[]) => {
  return a + numbers.reduce((prevTotal, num) => prevTotal + num, 0);
};

// infer parameter type
type TotalParameterType = Parameters<typeof makeTotal>;

// using parameter type returns a tuple
let parameters: TotalParameterType = [10, 1, 2, 3, 4];
console.log(makeTotal(...parameters));

// Awaited and Promise
const getUsers = async (): Promise<User[]> => {
  const data = fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
};

type FetchUsersReturn = Awaited<ReturnType<typeof getUsers>>;
// const fetchedUsers: FetchUsersReturn = await getUsers();
getUsers().then((data: FetchUsersReturn) => console.log(data));


/************ Most confusing part of TypeScript *****************/
// type assertion
// keyof operator returns a union type of string literals
// e.g.,
type Attributes = {
  age: number;
  name: string;
  active: boolean;
};

// keyof attributes === "age" | "name" | "active"

// now what does "as" do in these following 2 cases,
const apple: Attributes = {
  age: 1,
  name: "apple",
  active: true,
};

// here, "name" as keyof Attributes
// asserting that "name" is a valid key of Attributes type object "apple"
const fruitName = apple["name" as keyof Attributes];

const getKeys = <T>(arg: T): string[] => {
  // here, "arg" as keyof T
  // asserting that, "arg" is a valid object that has properties with specific keys
  // returned by keyof T
  const appleKeys = Object.keys(arg as keyof T);
  return appleKeys;
};

// generic type extending interface
interface HasId {
  id: string;
}

const processUser = <T extends HasId>(user: T): T => {
  return user;
};

// complex generic example
const getUserProperty = <T extends HasId, K extends keyof T>(
  users: T[],
  key: K
): T[K][] => {
  return users.map((user) => user[key]);
};

const users = [
  { username: "protick", age: 30, active: true, id: "1" },
  { username: "john", age: 25, active: false, id: "2" },
  { username: "doe", age: 20, active: true, id: "3" },
];

const usersUserNames = getUserProperty(users, "username");

console.log(usersUserNames);

// defining type at the time of passing argument to a generic class
const anotherState1 = new StateObject<(string | number | boolean)[]>([12]);
