import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosService);
    service.cleanAll()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo and assign createdAt and Id fields', () => {
    service.addTodo({
      title: "test",
      done: false,
      description: "Description"
    })

    const todo = service.todos().at(0);
    expect(todo?.id).toBe(1);
    expect(todo?.createdAt).toBeDefined()
  })

  it('should create todo and assign createdAt and Id fields', () => {
    service.addTodo({
      title: "test1",
      done: false,
      description: "Description1"
    })

    service.addTodo({
      title: "test2",
      done: true,
      description: "Description2"
    })

    // console.log(service.todos())

    {
      const todo = service.todos().at(1)!!;
      service.updateTodo(2, {
        ...todo,
        title: "updatedTitle",
      })
    }

    const todo = service.todos().at(0);
    expect(todo?.id).toBe(1);
    expect(todo?.createdAt).toBeDefined()
  })

});
