import { AcWebRequest } from "@autocode-ts/ac-web";
import { AcWebRoute } from "@autocode-ts/ac-web";
import { AcWebController } from "@autocode-ts/ac-web";
import { AcLogger } from "@autocode-ts/autocode";

@AcWebController()
@AcWebRoute({path:'/api/auth'})
export class AuthController{

    @AcWebRoute({path: '/forgot-password', method: 'POST'})
    async forgotPassword(request:AcWebRequest,logger:AcLogger){
        
    }

    @AcWebRoute({path: '/login', method: 'POST'})
    async login(request:AcWebRequest,logger:AcLogger){
        
    }

    @AcWebRoute({path: '/register', method: 'POST'})
    async register(request:AcWebRequest,logger:AcLogger){
        
    }   

    @AcWebRoute({path: '/verify-otp', method: 'POST'})
    async verifyOtp(request:AcWebRequest,logger:AcLogger){
        
    }
    
}