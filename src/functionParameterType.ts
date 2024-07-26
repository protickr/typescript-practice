function greet(name: string, date: Date) {
  console.log(`Hello ${name} today is ${date.toLocaleDateString()}`);
}

greet("Protick Roy", new Date());
