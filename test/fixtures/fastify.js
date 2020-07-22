module.exports = [{
  url: "/pets",
  method: "GET",
  schema: {
    params: undefined,
    query: {
      type: "object",
      required: [],
      properties: {
        limit: {
          type: "integer",
          format: "int32"
        }
      }
    },
    response: {
      200: {
        "$ref": "#/components/schemas/Pets"
      }
    }
  },
  handler: 'listPets'
},
{
  url: "/pets",
  method: "POST",
  schema: {
    params: undefined,
    query: undefined,
    response: {}
  },
  handler: 'createPets'
},
{
  url: "/pets/:petId",
  method: "GET",
  schema: {
    query: undefined,
    params: {
      type: "object",
      required: ["petId"],
      properties: {
        petId: {
          type: "string"
        }
      }
    },
    response: {
      200: {
        "$ref": "#/components/schemas/Pet"
      }
    }
  },
  handler: 'showPetById'
}]
