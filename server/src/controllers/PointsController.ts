import knex from '../database/connection';
import { Request, Response} from 'express';
import { KnexTimeoutError } from 'knex';

class PointController {
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const trx = await knex.transaction(); //Caso haja algum erro no insert ele da rollback por exemplo id de item invalido
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
        const pointItems = items.split(',')
                                .map((item: string) => Number(item.trim()))
                                .map((item_id: number) => {
                                    return {
                                        item_id,
                                        point_id
                                    }
                                });
        await trx('point_items').insert(pointItems);
    
        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point,
         });

    }
  
    async show(request: Request, response: Response) {

        const { id } = request.params; // ou  const id = request.params.id;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({message : 'Point not found'})
        }

        const serializedPoints = {
            ...point,
            image_url: `http://192.168.0.48:8081/uploads/image-point/${point.image}`,
        };

        // Select * FROM items
        //      JOIN point_items ON items.id = point_items.item_id
        // WHERE point_items.point_id = {id}
        const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.title');

        return response.json({point: serializedPoints, items});

    }

    async index(request: Request, response: Response) {

        //Mesmo que criar 3 const diferentes 
        // const city = request.query.city
        // const uf = request.query.uf
        // cont items = request.query.items
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map( item => Number(item.trim()) );
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .andWhere('city', String(city))
            .andWhere('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point =>{
            return {
                ...point,
                image_url: `http://192.168.0.48:8081/uploads/image-point/${point.image}`,
            };
        });

        return response.json(serializedPoints);

    }
  
}

export default PointController;