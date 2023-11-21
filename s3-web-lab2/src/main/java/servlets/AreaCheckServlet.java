package servlets;

import java.io.IOException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import data.CollisionData;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));
            double start = System.currentTimeMillis();
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
            DecimalFormat decimalFormat = new DecimalFormat("0.0000");
            String time = now.format(formatter);

            if (validate(x, y, R)) {
                boolean collision = checkHit(x, y, R);
                double execTime = (System.currentTimeMillis() - start) / 1000.0;
                String executionTime = decimalFormat.format(execTime);
                CollisionData data = new CollisionData(collision, x, y, R, time, executionTime);

                HttpSession session = request.getSession(true);
                List<CollisionData> sessionList = (List<CollisionData>) session.getAttribute("sessionList");
                if (sessionList == null) {
                    sessionList = new ArrayList<>();
                    session.setAttribute("sessionList", sessionList);
                }
                sessionList.add(data);
            }
        } catch (Exception e) {
            getServletContext().setAttribute("error", e.getMessage());
            request.getServletContext().getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    public boolean validate(float x, float y, float R) {
        if (4 < x || x < -4) {
            return false;
        }
        if (3 < y || y < -3) {
            return false;
        }
        if (R < 1 || 3 < R) {
            return false;
        }
        return true;
    }

    public boolean checkHit(float x, float y, float R) {
        // Square 1st quarter.
        if (x > 0 && y > 0 && x < R * 0.5 && y < R) {

            return true;
        }
        // Circle 2nd quarter.
        float dist = (float) Math.sqrt(x * x + y * y);
        if (dist < R && x < 0 && y > 0) {
            return true;
        }
        // Triangle 4th  quarter.
        if (x > 0 && y < 0 && y > x * 2 - R) {
            // line  y = x * 2 - R;
            // y > x * 2 - R
            return true;
        }

        return false;
    }
}