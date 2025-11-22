import {serve} from 'bun'

/* call serve function from bun 
1. provide object to serve :- pass fetch(request) method- 
- fetch url hit comma and then enter
-mention port 
-mention hostname
-while executing bun and file name
*/

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/'){
            return new Response("Hello from bun server", {status:200})
        }else if(url.pathname === '/ice-tea'){
            return new Response("Ice tea is a good option", {status:200})
        }
        else{
            return new Response("404 Not Found",{status:404})
        }
    },
    port :3000,
    hostname:'127.0.0.1'

})