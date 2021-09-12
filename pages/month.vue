<template>
  <div class="container">
    <div class="header">
      <h2>{{ dateDisplay }}</h2>
      <div>
        <button @click="yearNav--">&laquo; Ano Anterior</button>
        <button @click="monthNav--">< Mês Anterior</button>
        <button @click="yearNav = monthNav = 0">Mês Atual</button>
        <button @click="monthNav++">Próximo Mês ></button>
        <button @click="yearNav++">Próximo Ano &raquo;</button>
      </div>
    </div>
    <div class="weekdays">
      <div>Domingo</div>
      <div>Segunda</div>
      <div>Terça</div>
      <div>Quarta</div>
      <div>Quinta</div>
      <div>Sexta</div>
      <div>Sábado</div>
    </div>
    <MonthView :days="days"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        monthNav: 0,
        yearNav: 0,
        weekdays: ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'],
        today: new Date()
      }
    },
    computed: {
      offset() {
        return new Date(this.today.getFullYear() + this.yearNav, this.today.getMonth() + this.monthNav);
      },
      dateDisplay() {
        return this.offset.toLocaleDateString('pt-br',{month:'long', year:'numeric'});
      },
      days() {
        const firstDayofMonth = new Date(this.offset.getFullYear(), this.offset.getMonth(), 1);
        const daysInMonth = new Date(this.offset.getFullYear(), this.offset.getMonth() + 1, 0).getDate();

        const weekday = firstDayofMonth.toLocaleDateString('pt-br', { weekday: 'long' });
        const paddingDays = this.weekdays.indexOf(weekday);
        
        let dayList = [];
        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
          if (i > paddingDays) {
            let date = new Date(this.offset.getFullYear(), this.offset.getMonth(), i - paddingDays).toLocaleDateString();
            let classes = this.monthNav === 0 && this.yearNav === 0 && this.today.getDate() == i - paddingDays ? ['day','today'] : ['day'];
            dayList.push({
              date: date,
              day: i - paddingDays,
              sessions: this.$store.getters.sessionsByDate(date),
              classes: classes
            });
          } else {
            dayList.push({
              classes: ['day','padding']
            });
          }
        }
        return dayList;
      }
    }
  }
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .header h2:first-letter {
    text-transform: capitalize;
  }
  .header div {
    margin: 24px 5px 0;
  }
  .weekdays div {
    width: calc(100% / 7);
    text-align: center;
    font-weight: bold;  
    line-height: 200%;
    float: left;
  }
  .day {
    box-sizing: border-box;
    width: calc(100% / 7 - 10px);
    margin: 5px;
    padding: 10px;
    height: 100px;
    float: left;
  }
  .today {
    outline: 2px solid #000;
  }
  .day:not(.padding) {
    box-shadow: 0 0 5px #ccc;
  }
</style>