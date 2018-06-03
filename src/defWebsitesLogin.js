export function defWebsitesLogin(webiste_login_id,uid,website_type,username,password,data){
    var website_login = {
        [webiste_login_id]:{
            'user':user,
            'website_type':website_type,
            'username':username,
            'password':password,
            'data':data
        }
    }
    return(website_login);
}