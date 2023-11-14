package Servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Ваш код проверки попадания точки в область

        // Получите результат проверки (например, true или false)
        boolean pointInArea = true; // Переменная для примера, замените её на результат вашей проверки

        List<Boolean> results = (List<Boolean>) getServletContext().getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
        }

        results.add(pointInArea);
        getServletContext().setAttribute("results", results);

        // Формируйте HTML-страницу с результатами
        // ...
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}
