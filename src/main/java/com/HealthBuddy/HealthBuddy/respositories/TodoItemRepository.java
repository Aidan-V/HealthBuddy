package com.HealthBuddy.HealthBuddy.respositories;

import com.HealthBuddy.HealthBuddy.models.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {



}
