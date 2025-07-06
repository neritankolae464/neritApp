import { E2E_TESTS_REGEX, JS_REGEX } from './constants';

describe('Regular Expressions used in Fitness Functions', () => {
  describe(`E2E_TESTS_REGEX "${E2E_TESTS_REGEX}"`, () => {
    const PATHS_IT_SHOULD_MATCH = [
      'test/e2e/file.js',
      'test/e2e/path/file.ts',
      'test/e2e/much/longer/path/file.jsx',
      'test/e2e/much/longer/path/file.tsx',
      'development/fitness-functions/file.js',
      'development/fitness-functions/path/file.ts',
      'development/fitness-functions/much/longer/path/file.jsx',
      'development/fitness-functions/much/longer/path/file.tsx',
      'development/webpack/file.js',
      'development/webpack/path/file.ts',
      'development/webpack/much/longer/path/file.jsx',
      'development/webpack/much/longer/path/file.tsx'
    ];

    const PATHS_IT_SHOULD_NOT_MATCH = [
      'file', 
      'file.extension', 
      'path/file.extension', 
      'much/longer/path/file.extension', 
      
      ...['js','ts','jsx','tsx'].flatMap(ext => [
        `file.${ext}`,
        `path/file.${ext}`,
        `much/longer/path/file.${ext}`
       ])
    ];

    describe('included paths', () => {
       PATHS_IT_SHOULD_MATCH.forEach(path =>
         it(`should match "${path}"`, () =>
           expect(E2E_TESTS_REGEX.test(path)).toStrictEqual(true)
         )
       );
     });

     describe('excluded paths', () => {
       PATHS_IT_SHOULD_NOT_MATCH.forEach(path =>
         it(`should not match "${path}"`, () =>
           expect(E2E_TESTS_REGEX.test(path)).toStrictEqual(false)
         )
       );
     });
  });

  describe(`JS_REGEX "${JS_REGEX}"`, () => {
    const PATHS_IT_SHOULD_MATCH = [
       "app/much/longer/path/file.js",
       "app/much/longer/path/file.jsx",
       "offscreen/path/file.js",
       "offscreen/path/file.jsx",
       "shared/file.js",
       "shared/file.jsx",
       "ui/much/longer/path_file.js",
       "ui/much_ / longer / path_file . jsx "
     ].map(p=>p.trim());

    const PATHS_IT_SHOULD_NOT_MATCH = [
        ...[
          '',
          '.extension' ,
          '.ts' ,
          '.tsx'
        ].flatMap(e=>[
            `file${e}`,
            `path/${'file'+e}`,
            `much / longer / path/${'file'+ e}`
        ]),
        // JS or JSX files outside allowed directories
        "test / longer / path_file . js ",
        "random / longer / path_file . jsx "
   ].map(p=>p.trim());

   describe("included paths",()=>{
     PATHS_IT_SHOULD_MATCH.forEach(path=>
         it(`should match "${path}"`,()=>expect(JS_REGEX.test(path)).toStrictEqual(true))
     );
   });

   describe("excluded paths",()=>{
     PATHS_IT_SHOULD_NOT_MATCH.forEach(path=>
         it(`should not match "${path}"`,()=>expect(JS_REGEX.test(path)).toStrictEqual(false))
     );
   });
 });
});
