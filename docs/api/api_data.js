define({ "api": [
  {
    "type": "post",
    "url": "/api/categories",
    "title": "",
    "name": "Add_a_category",
    "group": "Categories",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ name: string }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ String }",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/categories.router.ts",
    "groupTitle": "Categories"
  },
  {
    "type": "put",
    "url": "/api/categories",
    "title": "",
    "name": "Edit_a_category",
    "group": "Categories",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ id: string; name: string; }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ id: string; name: string; }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/categories.router.ts",
    "groupTitle": "Categories"
  },
  {
    "type": "post",
    "url": "/api/categories/search",
    "title": "",
    "name": "Search_for_categories",
    "group": "Categories",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n start?: number;\n length?: number;\n filters: {\n   name: string;\n   value: any;\n }[];\n order?: {\n   name: string;\n   value: 'asc' | 'desc';\n }[];\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  data: {\n   id: string;\n   name: string;\n }[],\n total: number;\n filtered: number;\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/categories.router.ts",
    "groupTitle": "Categories"
  },
  {
    "type": "post",
    "url": "/api/companies",
    "title": "",
    "name": "Add_a_company",
    "group": "Companies",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   name: string;\n   logoUrl: string;\n   email: string;\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ String }",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/companies.router.ts",
    "groupTitle": "Companies"
  },
  {
    "type": "post",
    "url": "/api/companies/category",
    "title": "",
    "name": "Associate_Company_to_Category",
    "group": "Companies",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ companyId: string; categoryId: string }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   id: string;\n   name: string;\n   logoUrl: string;\n   email: string;\n   categories: string[];\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/companies.router.ts",
    "groupTitle": "Companies"
  },
  {
    "type": "put",
    "url": "/api/companies",
    "title": "",
    "name": "Edit_a_company",
    "group": "Companies",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   id: string;\n   name: string;\n   logoUrl: string;\n   email: string;\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   id: string;\n   name: string;\n   logoUrl: string;\n   email: string;\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/companies.router.ts",
    "groupTitle": "Companies"
  },
  {
    "type": "get",
    "url": "/api/companies/{id}",
    "title": "",
    "name": "Get_a_company_by_Id",
    "group": "Companies",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   id: string;\n   name: string;\n   logoUrl: string;\n   email: string;\n   categories: string[];\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/companies.router.ts",
    "groupTitle": "Companies"
  },
  {
    "type": "post",
    "url": "/api/companies/search",
    "title": "",
    "name": "Search_for_companies",
    "group": "Companies",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n start?: number;\n length?: number;\n filters: {\n   name: string;\n   value: any;\n }[];\n order?: {\n   name: string;\n   value: 'asc' | 'desc';\n }[];\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  data: {\n   id: string;\n   name: string;\n }[],\n total: number;\n filtered: number;\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/web/routers/companies.router.ts",
    "groupTitle": "Companies"
  }
] });
