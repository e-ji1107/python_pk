package com.pknu.my01.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.my01.dto.ChatRequest;
import com.pknu.my01.service.OpenAiService;

@RestController
public class My02Controller {
    private final OpenAiService openAiService;

    public My02Controller(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/final_chatbot")
    @ResponseBody
    public Map<String, String> chat(@RequestBody ChatRequest request) {
        System.out.println(request.getMessage());
        String message = request.getMessage();
        String answer;

        if ("안녕".equals(message)) {
            answer = "반가워😉";
        } else if ("배고파".equals(message)) {
            answer = "밥 먹ㅇㅓ🍚";
        } else {
            // openai()
            answer = openAiService.ask(message);
        }

        return Map.of("reply", answer);
    }
}
