package com.ankietypl.config;


import com.ankietypl.model.User;
import com.ankietypl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;


@Component
public class RestAuthenticationSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
        User user = userRepository.findOneByEmail(authentication.getName());
        if (user != null)
            SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, user);
    }
}