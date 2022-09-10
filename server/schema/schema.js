

const {GraphQLSchema , GraphQLObjectType , GraphQLID, GraphQLString, GraphQLEnumType, GraphQLList, GraphQLNonNull} = require('graphql')
const Project = require('../models/Project')
const Client = require('../models/Client')




const clientType = new GraphQLObjectType({
    name : 'clients',
    fields : {
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        email : {type : GraphQLString},
        phone : {type : GraphQLString},
    }
})



const projectType = new GraphQLObjectType({
    name : 'projects',
    fields : {
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        description : {type : GraphQLString},
        status : {type : GraphQLString},
        client : {
            type : clientType,
            resolve(parent , args){
                return Client.findById(parent.cliendID)
            }
        }
        
    }
})

const root_query = new GraphQLObjectType({
    name : 'query',
    fields : {
        clients : {
            type : new GraphQLList(clientType) ,
            resolve(parent, args) {
                return Client.find()
            }
        },
        client : {
            type : new GraphQLList(clientType) ,
            args : {
                id:{
                    type: new GraphQLNonNull(GraphQLID) 
                }
            },
            resolve(parent, args) {
                return Client.find({_id : args.id})
            }
        },
        projects : {
            type : new GraphQLList(projectType),
            resolve(parent, args){
                return Project.find()
            }
        },
        project : {
            type : new GraphQLList(projectType),
            args : {
                id:{
                    type: new GraphQLNonNull(GraphQLID) 
                }
            },
            resolve(parent, args){
                return Project.find({_id : args.id})
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name : 'mutation',
    fields : {

        addClient : {
            type : clientType,
            args:{
                name : {
                    type : GraphQLString
                },

                email : {
                    type : GraphQLString
                },

                phone : {
                    type : GraphQLString
                },
            },
            resolve(parent , args){
                const client = new Client({
                    name : args.name,
                    email : args.email,
                    phone : args.phone
                })

                return client.save()
            }
        },
        addProject : {
            type : projectType,
            args : {
                name : {
                    type : GraphQLString
                },
                description : {
                    type : GraphQLString
                },
                status : {
                    type : new GraphQLEnumType({
                        name : 'projectStatus',
                        values : {
                            new : {value : 'just started'},
                            incompelete : {value : 'Not Compeleted'},
                            finished : {value : 'Compeleted'},
                        }
                    })
                },
                cliendID : {
                    type : new GraphQLNonNull(GraphQLID) 
               }
            },
            resolve(parent , args){
       
                const project = new Project({
                    cliendID : args.cliendID,
                    name : args.name,
                    description : args.description,
                    status : args.status
                })

                return project.save()
            }
        },

        removeProject : {
            type : projectType,
            args : {
                id : {
                    type : new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent , args){
                return Project.deleteOne({_id : args.id} , (err) => {
                    if(err){console.log(err)}
                })
            }
        },
        removeClient : {
            type : clientType,
            args : {
                id : {
                    type : new GraphQLNonNull(GraphQLID)
                } 
            },
            resolve(parent,args){
        
                return Client.findByIdAndDelete(args.id)
            }
        },

        UpdateProject : {
            type : projectType,
            args : {
                project_id : {
                    type : new GraphQLNonNull(GraphQLID)
                },
                name : {
                    type : GraphQLString
                },
                description : {
                    type : GraphQLString
                },
                status : {
                    type : new GraphQLEnumType({
                        name : 'projectStatuser',
                        values : {
                            new : {value : 'just started'},
                            incompelete : {value : 'Not Compeleted'},
                            finished : {value : 'Compeleted'},
                        }
                    })
                },
                cliendID : {
                    type : GraphQLID 
               }
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.project_id , {
                    name : args.name,
                    description : args.description,
                    status : args.status,
                    cliendID : args.cliendID
                })
            }
        },
        UpdateClient : {
            type : clientType,
            args : {
                client_id : {
                    type : new GraphQLNonNull(GraphQLID)
                },
                name : {type : GraphQLString},
                email : {type : GraphQLString},
                phone : {type : GraphQLString},

            },
            resolve(parent,args){
                return Client.findByIdAndUpdate(args.client_id , {name : args.name , email : args.email , phone : args.phone})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : root_query,
    mutation
})