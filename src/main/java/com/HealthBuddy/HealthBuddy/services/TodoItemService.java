package com.HealthBuddy.HealthBuddy.services;

import com.HealthBuddy.HealthBuddy.models.TodoItem;
import com.HealthBuddy.HealthBuddy.respositories.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class TodoItemService {
    @Autowired
    private TodoItemRepository todoItemRepository;
    public Iterable<TodoItem>getAll(){
        return todoItemRepository.findAll();
    }
    public Optional<TodoItem> getById(Long id){
        return todoItemRepository.findById(id);
    }
    public TodoItem save(TodoItem todoItem) {
        if(todoItem.getId() == null) {
            todoItem.setCreatedAt(Instant.now());
        }
        todoItem.setUpdatedAt(Instant.now());
        return todoItemRepository.save(todoItem);
    }

    public void deleteById(TodoItem todoItem){
        todoItemRepository.delete(todoItem);
    }
    public void delete(TodoItem todoItem) {
        todoItemRepository.delete(todoItem);
    }



}
