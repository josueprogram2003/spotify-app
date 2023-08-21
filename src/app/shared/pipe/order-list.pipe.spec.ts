import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/track.json'
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it("Probando entrar y salida de datos",()=>{
    const pipe = new OrderListPipe();
    const {data}:any = (mockRaw as any).default;

    const result: TrackModel[]= pipe.transform(data,'name','ASC')

    expect(result).toEqual(data)
  })

  it("Probar si se ordena de manera correcta ASC",()=>{
    const pipe = new OrderListPipe();
    const {data}:any = (mockRaw as any).default;
    const firstValue = data.find((i:any)=>i._id ==7)
    const lastValue = data.find((i:any)=>i._id ==6)

    // ACT
    const result: TrackModel[]= pipe.transform(data,'name','asc')
    const firstResult = result[0]
    const lastResult = result[result.length-1];
    expect(firstResult).toEqual(firstValue)
    expect(lastResult).toEqual(lastValue)
  })

    it("Probar si se ordena de manera correcta DESC",()=>{
    const pipe = new OrderListPipe();
    const {data}:any = (mockRaw as any).default;
    const firstValue = data.find((i:any)=>i._id ==7)
    const lastValue = data.find((i:any)=>i._id ==6)

    // ACT
    const result: TrackModel[]= pipe.transform(data,'name','desc')
    const firstResult = result[0]
    const lastResult = result[result.length-1];
    expect(firstResult).toEqual(lastValue)
    expect(lastResult).toEqual(firstValue)
  })
});

