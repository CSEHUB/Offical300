export function defUser(user_id,email,workspaces,last_workspace,background_color){
    var user = {
        [user_id]:{
            'email':email,
            'workspaces':workspaces,
            'last_workspace':last_workspace,
            'background_color':background_color
        }
    }
}