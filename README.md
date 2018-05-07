# Training Planner App

![Demo](https://media.giphy.com/media/t5YBFtspIL8bZTcM52/giphy.gif)

## Description

It allows to store our list of workouts and configure them individually based on CPQ (Configure Product Quote) idea. Basically each workout have separate list of parameters by which we can describe them, e.g.

Workout focusing on gaining muscles would have parameters like

```
Parameter 1
Label: Sets
Value: 3-4
```

```
Parameter 2
Label: Repetitions
Value: 8-12
```

```
Parameter 3
Label: Break Duration
Value: 120 seconds
```

```
Parameter 4
Label: Load
Value: 75% of your max
```

But if someone would like to use it for different kind of training, e.g. running the parameters would be completely different

```
Parameter 1
Label: Type of run
Value: Sprint
```

```
Parameter 2
Label: Distance
Value: 100 meters
```

```
Parameter 2
Label: Repeat
Value: 8 times
```

```
Parameter 3
Label: Break between sprints
Value: 120 seconds
```

```
Parameter 4
Label: Max pulse
Value: 150
```

```
Parameter 5
Label: Interval training
Value: Yes, run 3/4 of the distance with maximum speed then slow down
```

Also each workout is getting chart diagram generated showing up all muscle groups engaged during a workout. For the gym training when we have a lot of exercises it can help monitor if our workout is focusing on what we want, for example for full body workouts we want it to be as much balanced as it can be and to engage all muscle groups, but when doing so called splits we want to focus only on one muscle group.

Exercises are added per workout and can be described by name, description, list of muscles engaged, link to exercise (for example link to the video showing the correct technique etc.) and exercise type. 

Exercise type is the type of the exercise we are performing, for example it will be push for Chest Press, but pull for Dead Lift. If we are doing Calisthenics it can be Bodyweight exercise. The exercise types can be added from separate menu by the user so he is not limited and can provide his types to the app.



## Running application

To start watcher automatically waiting for changes and refreshing browser when needed in client directory run
```
npm run live
```
To run scss compiler watching for changes in client directory run
```
npm run dev
```
To start a database server in server directory and run
```
npm start
```
