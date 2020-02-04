Mister Barista
by Karl Lilje

To Run:
Start index.html with :
npx serve


Part 2

Please answer the following questions:
1. What is easing? 
Smoothing or spline algorithms to make animations or transitions more gentle over time, especially at starts and stops.

Write few types of easing. 
EaseIn, EaseOut, EaseInOut, Bounce, easeInSine, easeInQuad (t => t*t)

Where would you apply easing functions? 
When animating objects via code to make their actions more natural, smooth
When counting up numbers and you want to slow down or speed up at the end

2. What are pros & cons of using Promises in Javascript?  
Pros: Asynchronous, they will return when the server sends the data. 
Chainable, can wait for one to complete before firing another.
Cons: Asynchronous, server data handlers must be detached from the main game loop, requires more sophisticated data handling e.g. pub sub mechanisms, observables, or event handlers. 
Not suitable for often-repeating data from e.g. a multiplayer server (a udp broadcast is probably better).
Can't cancel or query their status during await as they are on diferent threads during execution.

What is the super-set of Promises?
ES6, (implemented via HttpRequest et al), Promises are not fundamental types in JavaScript

3. Which non programmable parts of the graphics pipeline can be used to speed up rendering and improve performance. Please give examples.
More compact / lower resolution textures, smaller textures.
Using native texture formats on IOS (e.g. PVRTC, MeTaL), Android (etc2), Windows DirectX(dds), PlayStation etc (as the decompressors are typically hardware accelerated and proprietary)
Avoiding Alpha channels and alpha blends (realtime compositing) where possible
Render using the Lowest Screen / Canvas Resolution possible
Avoid dynamic upates of e.g. text strings, rather pre-render as much as possible or cache / pool renders.

4. Pick three design patterns that are in your opinion most useful for game development, describe them and write a short example how would you use them in development process.
Singleton - Useful as containers instead of globals, only one can be instanced, e.g. an Audio Engine service.
Factory Pattern - Creates object instances. Useful for debugging object creation, and for swapping different objects easily
Mediator Pattern - Separates objects from their messages. Acts like a pub-sub / central nervous system, for 'opt in' message handling. Easy to swap components, easy to debug, and robust.

5. Explain Redux design pattern.
Manages program state in a single object, and emits uni-directional observable message/event flow.
Typically all subscribers/reducers receive all change events and must filter what they need.

6. What is game loop? 
The repeating part of a game, that typically fetches player input and server data, processes the game logic, calculates score, renders the video and audio, and repeats.

What is FPS?
Number of rendered Frames Per Second, the speed of video rendering

7. Write code to convert an array of strings to an array of the lengths of those strings – use JS ES6 or TS
let result = ["one","two", "three", "seven"].map(x=>x.length);

8. Write code to sum an array of numbers – use JS ES6 or TS
let result = [5,1,6,7,21].reduce(x,y) => x+y,0);
