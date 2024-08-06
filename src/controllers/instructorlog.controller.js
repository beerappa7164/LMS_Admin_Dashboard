const BaseController=require('./base.controller')
const InstructorLogRepository=require('../repositories/instructorlog.repositories');

class InstructorLogController extends BaseController
{
    constructor()
    {
        super(InstructorLogRepository)
    }
};

module.exports=new InstructorLogController();