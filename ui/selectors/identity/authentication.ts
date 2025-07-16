 We are optimizing by:
 1. Removing the JSDoc comments as per the instruction to output only code.
 2. We can also note that in `selectSessionData`, we are using optional chaining and array access, which is already concise.
 3. However, we can make `selectSessionData` slightly more efficient by avoiding `Object.entries` if not necessary.

 But note: The original logic for selectSessionData is to get the first value of the object if it exists? 
 However, note that objects in JavaScript do not guarantee order until ES2015 (and even then, insertion order for string keys). 
 Since we are using Object.entries and then taking index 0? It might be better to get an array of values and take the first? 

 Alternatively, if there is only one key-value pair as implied by [0]? Then we can use:

   const sessionData = neritapp.srpSessionData;
   return sessionData ? Object.values(sessionData)[0] : undefined;

 But note: Object.values returns an array of values without keys.

 Alternatively, since we don't care about the key, why not?

 However, let's preserve behavior exactly.

 Original:
   neritapp.srpSessionData ? Object.entries(neritapp.srpSessionData)?.[0]?.[1] : undefined

 This gets the first entry (an array [key, value]) and then takes index 1 (the value).

 We can rewrite without entries:

   return neritapp.srpSessionData ? Object.values(neritapp.srpSessionData)[0] : undefined;

 But caution: what if srpSessionData is an empty object? Then [0][1] would be undefined but accessing index[0] on values would be undefined too? Actually:

   Original: [] -> [0][1]: accessing property '1' on undefined -> fails with optional chaining -> returns undefined?
      Actually: [Object.entries({}) => [] so [][0] is undefined -> then .[1]: optional chaining doesn't help beyond one step?
      Correction: 
        let arr = Object.entries({}); // []
        arr[0] // => undefined
        arr[0]?.[1] // => uses optional chaining on index access -> returns undefined

        Similarly for values: 
          let values = Object.values({}); // []
          values[0]; // => undefined

 So same behavior.

 Also performance-wise:
    Creating entries vs creating a values array both create arrays and iterate over properties?

    However, `values` might skip creating intermediate arrays of entries (but internally they both iterate similarly).

    In fact they are very similar in performance characteristics.

    But I think readability might improve with `Object.values` because we don't need to remember that entry has two parts and take second element.

 So replace with:

     neritapp.srpSessionData ? Object.values(neritapp.srpSessionData)[0]:undefined

 Also note that createSelector takes an input selector function and a transform function.

 Let's write without comments as requested.
</think>
```typescript
import { createSelector } from 'reselect';

const getMetamask = (state) => state.neritapp;

export const selectIsSignedIn = createSelector(
  getMetamask,
  ({ isSignedIn }) => isSignedIn,
);

export const selectSessions = createSelector(
  getMetamask,
  ({ srpSessions }) => srpSessions || {},
);
