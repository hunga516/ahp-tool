<template>

    <div class="slider-container" @mouseenter="handleHover" @mouseleave="handleLeave">
        <div class="text-container">
            <h3>
                {{ $t(`${texto}`) }}
            </h3>
        </div>

        <input type="range" min="0" max="100" :step="12.5" v-model="valorInput" :id="id" :class="classe" ref="slider"
            :name="name" @input="handleInput">
        <div class="span-container">
            <div class="left-span-container">
                <span class="slider-span" id="slider-span-19" draggable="false">1/9</span>
                <span class="slider-span" id="slider-span-17" draggable="false">1/7</span>
                <span class="slider-span" id="slider-span-15" draggable="false">1/5</span>
                <span class="slider-span" id="slider-span-13" draggable="false">1/3</span>
            </div>
            <div class="right-span-container">
                <span class="slider-span" id="slider-span-1" draggable="false">1</span>
                <span class="slider-span" id="slider-span-3" draggable="false">3</span>
                <span class="slider-span" id="slider-span-5" draggable="false">5</span>
                <span class="slider-span" id="slider-span-7" draggable="false">7</span>
                <span class="slider-span" id="slider-span-9" draggable="false">9</span>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    name: "vue-range-button",
    props: {
        texto: {
            type: String,
            default: "undefined"
        },
        name: {
            type: String,
            default: "undefined"
        },
        id: {
            type: String,
            default: "undefined"
        },
        classe: {
            type: String,
            default: "undefined"
        },
        valor: {
            type: Number,
            default: 50
        }
    },
    emits: ["slider-value", "slider-hover", "slider-leave"],
    data() {
        return {
            valorInput: 50
        }
    },
    watch: {
        valorInput() {
            this.enviarValor()
            this.sliderColor()
        }
    },
    mounted() {
        this.valorInput = this.valor
    },
    methods: {
        enviarValor() {
            this.$emit("slider-value", [this.classe, this.id, this.valorInput, this.name])
        },

        sliderColor() {
            let meioEnd, meioStart, left, right;
            const valor = this.valorInput;

            if (valor >= 50) {
                right = 100 - valor;
                meioEnd = valor;
                meioStart = 50;
                left = 50;
            } else if (valor < 50) {
                right = 50;
                meioEnd = 50;
                meioStart = valor;
                left = valor;
            }

            this.$refs.slider.style.background = "linear-gradient(90deg,"
                + `#000000 0%, white ${left}%,`
                + `#000000 ${meioStart}%, #000000 ${meioEnd}%,`
                + `white ${right}%, #000000 100%)`
        },

        handleHover() {
            this.$emit("slider-hover", [this.classe, this.id, this.name])
        },

        handleLeave() {
            this.$emit("slider-leave")
        },

        handleInput() {
            const value = Number(this.valorInput);
            const values = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
            const mappedValues = {
                0: '1/9',
                12.5: '1/7',
                25: '1/5',
                37.5: '1/3',
                50: '1',
                62.5: '3',
                75: '5',
                87.5: '7',
                100: '9'
            };

            const closest = values.reduce((prev, curr) => {
                return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
            });

            this.valorInput = closest;
            this.enviarValor();
            this.sliderColor();
        }
    }
}
</script>
<style scoped>
.slider-container {
    position: relative;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    border-radius: 12px;
    transition: all 0.2s ease;
    cursor: pointer;
}

.slider-container:hover {
    border-color: #000;
}

h3 {
    display: flex;
    text-align: left;
    font-size: 0.9rem;
    color: #000;
    font-weight: 500;
    margin-bottom: 1rem;
}

.text-container {
    text-align: center;
    width: 100%;
}

.span-container {
    width: 100%;
    display: flex;
    font-size: 0.75rem;
    gap: 15px;
    margin-top: 0.5rem;
    color: #666;
}

.left-span-container {
    width: 45%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.right-span-container {
    width: 55%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.slider-span {
    user-select: none;
    -webkit-user-drag: none;
}

/* Slider styling */
input[type="range"] {
    width: 100%;
    height: 4px;
    border-radius: 50px;
    opacity: 0.9;
    background: linear-gradient(90deg,
            #000000 0%,
            #fff 50%,
            #fff 50%,
            #000000 100%);
    border: 1px solid #eaeaea;
    appearance: none;
    outline: none;
    transition: all 0.2s ease;
}

input[type="range"]:hover {
    opacity: 1;
    cursor: pointer;
}

/* Thumb styling - Chrome */
input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #000;
    border: 2px solid #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}

/* Thumb styling - Firefox */
input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #000;
    border: 2px solid #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}

/* Responsive */
@media (max-width: 930px) {
    #slider-span-1 {
        transform: translateX(-6.5px);
    }
}
</style>
