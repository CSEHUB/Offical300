export function defWorkspace(workspace_id,name,position,widgets){
    var workspace = {
        [workspace_id]:{
            'name':name,
            'position':position,
            'widgets':widgets
        }
    }
    return(workspace);
}