package com.pknu.my01.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String ask(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Map<String, Object>> messages = List.of(
                Map.of("role", "system", "content", "반말을 사용하며 다정하게 대답해줘. 이모티콘도 많이 붙여줘. 200자 이내로 정리해서 답해줘 "),
                Map.of("role", "user", "content", prompt));

        Map<String, Object> body = Map.of(
                "model", "gpt-4.1-nano", // gpt 모델 선정
                "messages", messages, // 메시지 입력
                "temperature", 1, // 온도 설정 (0~2)
                "max_tokens", 200, // 최대 토큰 수 (1~4096)
                "presence_penalty", 0.6, // 새로운 주제에 대한 반응을 조절하는 패널티 (0~2)
                "frequency_penalty", 0.5 // 자주 등장하는 단어에 대한 패널티 (0~2)

        );
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    "https://api.openai.com/v1/chat/completions",
                    HttpMethod.POST,
                    request,
                    Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "오류: " + e.getMessage();
        }
    }

}

//