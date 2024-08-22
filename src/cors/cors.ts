/*
    CORS, or Cross-Origin Resource Sharing, is a security feature implemented by web browsers that restricts how web pages can request resources (like data, images, scripts) from a different domain than the one that served the web page.

    
    By default, web browsers follow the Same-Origin Policy (SOP), which means that a web page can only request resources from the same domain that served the page. This is to protect users from malicious websites trying to steal their data from another domain (cross-site scripting attacks). CORS is a way to loosen this restriction in a controlled and secure manner.


   request url- http://api-dev.zessta.com
    response header
    Access-Control-Allow-Origin: *

   client  url - http://frontenc-microsift.com  http://youtube.com or any other client url
    request header - 
    x-custom-header: "custom header"

    *Core Concepts of CORS*
    https://fac-dev.arealytics.com.au/search

    origin - https://fac-dev.arealytics.com.au  protocol - http://fac-dev.arealytics.com.au:8080 
    1. Origin
        - An origin is defined by the scheme (protocol), hostname (domain), and port of a URL.

        - For example, the URL https://example.com:8080/path has the origin https://example.com:8080.

    2. Same-Origin Policy:
        - The Same-Origin Policy allows a web page to access resources (like APIs, images, stylesheets) only from the same origin.

        - Example: A page served from https://example.com can freely access resources from https://example.com, but cannot access resources from https://api.example.com without proper CORS headers.

    3. CORS Headers
        - Servers use specific HTTP headers to indicate which origins are allowed to access their resources. The key CORS headers include:

        Some of the Key or most common headers used are - 
        1. Access-Control-Allow-Origin
            
            Purpose - specifies which origin(s) are allowed to access the resource on the server. This header controls access to the resource from different domains.

            - Example - Access-Control-Allow-Origin: https://example.com

            - Usage: This configuration allows requests from https://example.com to access the resource. If a request originates from any other domain, it will be blocked by the browser.

            - WildCard - Access-Control-Allow-Origin: *

            - Usage: This allows any domain to access the resource. However, this is not allowed if the request includes credentials (e.g., cookies or HTTP authentication).

        2. Access-Control-Allow-Methods

            Purpose -  Specifies the HTTP methods (e.g., GET, POST, PUT, DELETE) that are allowed when accessing the resource.

            - Example - Access-Control-Allow-Methods: GET, POST, PUT

            - Usage: This configuration allows the client to use GET, POST, and PUT methods to interact with the resource. If a request uses any other method (e.g., DELETE), it will be blocked.

        3. Access-Control-Allow-Headers

            Purpose: Specifies which headers can be used in the actual request. This is important for custom headers that are not part of the simple request headers (e.g., Content-Type, Authorization).

            - Example - Access-Control-Allow-Headers: Content-Type, Authorization

            - Usage: This allows the client to include the Content-Type and Authorization headers in the request. If the client tries to send a request with any other custom headers not listed here, the request will be blocked.

    *CORS WorkFlow*

    - CORS headers are sent by the server in the response to indicate which cross-origin requests are permitted. The browser, which enforces the Same-Origin Policy (SOP), examines these headers to decide whether to allow or block the cross-origin request. Let's break down how this process works:

    Step 1: Initial Request
        - The client (browser) sends a request to a different origin.
        
        - If the request is a "simple request," the browser sends it directly.
        
        - If the request is more complex (e.g., involves non-simple HTTP methods like PUT or custom headers), the browser first sends a preflight request (an OPTIONS request) to the server to check if the actual request is allowed.

    Step 2: Server Response with CORS Headers
       - The server responds to either the simple request or the preflight request with CORS headers:

       Simple Request Example:
            HTTP/1.1 200 OK
            Access-Control-Allow-Origin: https://example.com

       Preflight Request Example:
            OPTIONS /resource HTTP/1.1
            Host: api.example.com
            Origin: https://example.com
            Access-Control-Request-Method: PUT
            Access-Control-Request-Headers: Content-Type, Authorization

        Server Response 
            HTTP/1.1 204 No Content
            Access-Control-Allow-Origin: https://example.com
            Access-Control-Allow-Methods: PUT, DELETE
            Access-Control-Allow-Headers: Content-Type, Authorization
            Access-Control-Max-Age: 3600

    Step 3: Browser Decision
        The browser evaluates the response’s CORS headers:

       - Access-Control-Allow-Origin: The browser checks if the origin of the requesting page is listed.
        
       - Access-Control-Allow-Methods: If it's a preflight response, the browser ensures the method is allowed.
       
       - Access-Control-Allow-Headers: The browser checks if the required headers are permitted.

        - If all conditions are met, the browser allows the response to be accessed by the client-side code.

        - If any condition fails (e.g., the origin isn’t allowed or the method isn’t permitted), the browser blocks the response, and an error is thrown in the client-side code.

    *Types of CORS Requests*

    1. Simple Requests - 
       - A simple request is one that meets certain criteria defined by the CORS specification:

        - The HTTP method is GET, POST, or HEAD.
        
        - The request does not include any custom headers (except Accept, Accept-Language, Content-Language, Content-Type with specific values like application/x-www-form-urlencoded, multipart/form-data, or text/plain).

        - Example of a Simple Request

            Client Side 

*/ 
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

//  Server Response 

// HTTP/1.1 200 OK
// Access-Control-Allow-Origin: https://mywebsite.com
// Content-Type: application/json
// {
//   "data": "Here is your data"
// }

/*
    Explanation:

   -  The browser sends a GET request to https://api.example.com.
    
   - The server responds with the Access-Control-Allow-Origin header, specifying https://mywebsite.com as an allowed origin.
   
   - If the origin of the request matches https://mywebsite.com, the browser allows the response to be accessed by the client-side code.



   2. Preflighted Requests - A preflighted request is required when
   
    - The request method is anything other than GET, POST, or HEAD.

    - The request includes custom headers, such as Authorization, or content types other than application/x-www-form-urlencoded, multipart/form-data, or text/plain.

    - Before sending the actual request, the browser sends an OPTIONS request to the server (known as a preflight request) to check if the actual request is safe to send.

*/
// Example of a Preflighted Request

fetch('https://api.example.com/update', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ name: 'John' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Preflight Request (OPTIONS):

//  The primary purpose of the OPTIONS method is to query the server to find out which HTTP methods and features are supported by a particular resource or server. It’s used to retrieve the options available for a resource without actually performing any actions on it.

// OPTIONS /update HTTP/1.1  - 
// Host: api.example.com
// Origin: https://mywebsite.com
// Access-Control-Request-Method: PUT
// Access-Control-Request-Headers: Content-Type, Authorization


// Preflight Response:

// HTTP/1.1 204 No Content
// Access-Control-Allow-Origin: https://mywebsite.com
// Access-Control-Allow-Methods: PUT
// Access-Control-Allow-Headers: Content-Type, Authorization


/*

    Explanation - 
        - The browser first sends an OPTIONS request to check if the server allows the PUT method and the specified headers from the origin https://mywebsite.com.

        - The server responds with the allowed methods, headers, and origin. If the preflight request is successful, the browser sends the actual PUT request.

        - The server’s response to the actual request includes the Access-Control-Allow-Origin header, and the browser allows the response to be accessed.



    3. Credentialed Requests
        - Credentialed requests include cookies, HTTP authentication, or client-side SSL certificates. To make such requests, the Access-Control-Allow-Credentials header must be set to true, and the Access-Control-Allow-Origin header cannot be set to * (wildcard).

*/ 
// Example of a Credentialed Request:

fetch('https://api.example.com/secure-data', {
  method: 'GET',
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


//   Server Response - 

// HTTP/1.1 200 OK
// Access-Control-Allow-Origin: https://mywebsite.com
// Access-Control-Allow-Credentials: true
// Content-Type: application/json
// {
//   "secureData": "Sensitive information"
// }

/*
    Explanation:

   -  The browser sends a GET request with credentials included.
    
   - The server responds with the Access-Control-Allow-Credentials header set to true and specifies the origin https://mywebsite.com.

   - If the origin matches and credentials are allowed, the browser allows the response to be accessed.
*/ 