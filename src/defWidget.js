export function defWigets(widget_id,url,website_name,position,width,height,website_login){
    var widget = {
        [widget_id]:{
            'url':url,
            'website_name':website_name,
            'position':position,
            'width':width,
            'height':height,
            'website_login':website_login
        }
    }
    return(widget);
}