<template>
    <div class="animations-wrapper">
        <div>Animations Route</div>
        <button @click="show =! show">Show Alert</button>
        <select v-model="changeAnimation">
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
        </select>
        <!--  <transition :name="changeAnimation">
                            <div v-show="show" class="some-info">Some info</div>
                        </transition>
                        <transition name="slide" type="animation">
                            <div v-if="show" class="some-info">Some info</div>
                        </transition>
                        <transition enter-active-class="animated bounce" leave-active-class="animated shake" appear>
                            <div v-show="!show" class="some-info">Some info</div>
                        </transition> -->
        <transition :name="changeAnimation" mode="out-in">
            <div v-if="!show" class="some-info" key="info">Some info</div>
            <div v-else class="some-other-info" key="other-info">Some other info</div>
        </transition>
        <hr>
        <button @click="load = !load">Load / Remove Element</button>
        <br>
        <br>
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @enter-cancellde="enterCancelled" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancellde="leaveCancelled" :css="false"> //don't look for css classes
            <div class="cube" v-if="load"></div>
        </transition>
        <hr>
        <br>
        <button @click="toggleComponents">Toggle Components</button>
        <br>
        <transition name="fade" mode="out-in">
            <component :is="selectedComponent"></component>
        </transition>
        <hr>
        <br><br>
        <button @click="addItem">Add item to list</button>
        <ul>
            <transition-group name="slide">
                <li class="list-item" v-for="(number, index) in numbers" :key="number" @click="removeItem(index)">{{number}}</li>
            </transition-group>
        </ul>
        <hr>
        <br><br>
        <transition name="flip" mode="out-in">
            <component :is="selectedComponent"></component>
        </transition>
    </div>
</template>

<script>
import ErrorAlert from './ErrorAlert.vue';
import SuccessAlert from './SuccessAlert';

export default {
    components: {
        error: ErrorAlert,
        success: SuccessAlert
    },
    data() {
        return {
            show: false,
            changeAnimation: 'fade',
            load: true,
            elementWidth: 100,
            selectedComponent: 'success',
            numbers: [1, 2, 3, 4, 5],
            counter: 6
        }
    },
    beforeRouteEnter: (to, from, next) => {
        console.log('Before route enter');
        //here component is not yet created, so pass callback
        //that is executed on enter. vm is the component instance
        next((vm) => {
            console.log('Callback from component guard: ', vm);
        });
    },
    beforeRouteLeave: (to, from, next) => {
        if (isBrowser) {
            confirm('Leave?') ? next() : next(false);
        } else {
            next();
        }
    },
    methods: {
        addItem() {
            const pos = Math.floor(Math.random() * this.numbers.length);
            this.numbers.splice(pos, 0, this.counter++);
        },
        removeItem(index) {
            this.numbers.splice(index, 1);
        },
        toggleComponents() {
            if (this.selectedComponent === 'success') {
                this.selectedComponent = 'error';
            } else {
                this.selectedComponent = 'success';
            }
        },
        beforeEnter(el) {
            console.log('Before enter');
            //reset before enter:
            this.elementWidth = 100;
            el.style.width = `${this.elementWidth}px`;
        },
        enter(el, done) {
            console.log('Enter');
            let round = 1;
            const interval = setInterval(() => {
                el.style.width = `${(this.elementWidth + round * 10)}px`;
                round++;
                if (round > 20) {
                    clearInterval(interval);
                    done();
                }
            }, 20);
            //done(); //needed if no css animation on the element and in async
        },
        afterEnter(el) {
            console.log('After enter');
        },
        enterCancelled(el) {
            console.log('Enter cancelled');
        },
        beforeLeave(el) {
            console.log('Before leave');
            this.elementWidth = 300;
            el.style.width = `${this.elementWidth}px`;
        },
        leave(el, done) {
            console.log('Leave');
            let round = 1;
            const interval = setInterval(() => {
                el.style.width = `${(this.elementWidth - round * 10)}px`;
                round++;
                if (round > 20) {
                    clearInterval(interval);
                    done();
                }
            }, 20);
            // done();
        },
        afterLeave(el) {
            console.log('After leave');
        },
        leaveCancelled(el) {
            console.log('Leave cancelled');
        }
    }
}
</script>